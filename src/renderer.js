function renderer(options) {
    const defaultClass = options.defaultClass.trim();

    function open(tokens, idx, _options, _env, _slf) {
        tokens[idx].attrJoin("class", tokens[idx].name);

        if (defaultClass.length > 0) {
            tokens[idx].attrJoin("class", defaultClass);
        }

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