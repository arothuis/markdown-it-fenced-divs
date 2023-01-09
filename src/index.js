const { parser } = require("./parser");
const { renderer } = require("./renderer");

const DEFAULT_OPTIONS = {
    // Class to add to each fenced div element (for easy generic styling)
    defaultClass: "",
};

function mdFencedDivsPlugin(md, _options) {
    const options = Object.assign(DEFAULT_OPTIONS, _options);

    const parse = parser();
    const render = renderer(options);

    const alt =  ["paragraph", "reference", "blockquote", "list"];
    md.block.ruler.before("fence", "fenced_container", parse.container, { alt });
    
    md.renderer.rules.fenced_container_open = render.open;
    md.renderer.rules.fenced_container_close = render.close;
}

module.exports = mdFencedDivsPlugin;