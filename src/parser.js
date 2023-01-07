const mark = ":::";

function parser() {
    function container(state, startLine, endLine, _silent) {
        const { src, bMarks, eMarks, tShift } = state;
        
        const openStart = bMarks[startLine] + tShift[startLine];
        const openEnd = eMarks[startLine];

        const markup = src.slice(openStart, openStart + mark.length);
        if (markup !== mark) {
            return;
        }

        let name = src.slice(openStart + mark.length, openEnd).trim();
        let params = "";
        let separator = name.indexOf(" ");
        if (separator > -1) {
            params = name.slice(separator + 1);
            name = name.slice(0, separator);
        }

        // Switch name and parameters if name is param-like
        if (name[0] === "{" && name[name.length - 1] === "}") {
            [name, params] = [params, name];
        }

        const closeLine = findClosingFence(state, startLine, endLine);

        const oldParent = state.parentType;
        const oldLineMax = state.lineMax;

        state.lineMax = closeLine;

        const openToken = state.push("fenced_container_open", "div", state.level + 1);
        openToken.block = true;
        openToken.map = [startLine, closeLine];
        openToken.name = name;
        openToken.info = params;
        openToken.markup = markup;

        state.md.block.tokenize(state, startLine + 1, closeLine);

        const closeToken = state.push('fenced_container_close', 'div', state.level - 1);
        closeToken.markup = state.src.slice(bMarks[closeLine], eMarks[closeLine]);
        closeToken.block  = true;

        state.parentType = oldParent;
        state.lineMax = oldLineMax;
        state.line = closeLine + (endLine === closeLine ? 0 : 1);

        return true;
    }

    function findClosingFence(state, startLine, endLine) {
        const { src, bMarks, eMarks, tShift } = state;
        let nextLine = startLine;
        let innerContainers = 0;

        while (nextLine++ < endLine) {
            const start = bMarks[nextLine] + tShift[nextLine];
            const end = eMarks[nextLine];

            if (src.slice(start, start + mark.length) !== mark) {
                continue;
            }

            // Another start block
            if (src.slice(start + mark.length, end).trim().length > 0) {
                innerContainers++;
                continue;
            }

            if (innerContainers > 0) {
                innerContainers--;
                continue;
            }

            return nextLine;
        }

        return endLine;
    }

    return {
        container,
    };
}

module.exports = {
    parser
};