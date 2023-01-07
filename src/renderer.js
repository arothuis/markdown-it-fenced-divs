function renderer() {
    function open(tokens, idx, _options, _env, _slf) {
        tokens[idx].attrJoin("class", tokens[idx].name);
        return _slf.renderToken(tokens, idx, _options, _env, _slf);
    }

    function close(_tokens, _idx, _options, _env, _slf) {
        return "</div>";
    }

    return {
        open,
        close,
    };
}

module.exports = {
    renderer,
}