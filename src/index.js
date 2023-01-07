const { parser } = require("./parser");
const { renderer } = require("./renderer");

function mdFencedDivsPlugin(md, _options) {
    const parse = parser();
    const render = renderer();

    const alt =  ["paragraph", "reference", "blockquote", "list"];
    md.block.ruler.before("fence", "fenced_container", parse.container, { alt });
    
    md.renderer.rules.fenced_container_open = render.open;
    md.renderer.rules.fenced_container_close = render.close;
}

module.exports = mdFencedDivsPlugin;