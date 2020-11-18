module.exports = (tree) => {
    const navHtml = [];
    const contentHtml  = [];

    const parse = (current, level = 0, path = "") => {
        const { children : childrenObj = {}, html, name : fullName = "", file = "" } = current;
        const isRoot = level === 0;
        const children = Object.values(childrenObj);

        const [ name ] = fullName.split("#").reverse();
        const [ id ] = file.split("#").reverse();

        if(!isRoot) {
            // Start content section
            contentHtml.push(`
                <div
                    class="${isRoot ? "docez-content-wrapper" : "docez-content-section"}"
                    data-level="${level}"
                    id="${path ? `${path}/` : ""}${id}"
                >
                ${html}
            `);

            // Start nav group
            navHtml.push(`
                <div
                    class="docez-nav-group"
                    data-level="${level}"
                >
                    <a href="#${path ? `${path}/` : ""}${id}">${name}</a>
            `);
        }

        // Add children
        if(children.length) {
            const sorted = children.sort(({ name : aName }, { name : bName }) => {
                const textA = aName.toUpperCase();
                const textB = bName.toUpperCase();
                
                if(textA < textB) {
                    return -1;
                } else if(textA > textB) {
                    return 1;
                }
 
                return 0;
            });

            sorted.forEach((child) => {
                parse(child, level + 1);
            });
        }

        if(!isRoot) {
            // End content section
            contentHtml.push("</div>");
    
            // End nav group
            navHtml.push("</div>");
        }
    };

    parse(tree);

    const html = {
        nav     : navHtml.join(""),
        content : contentHtml.join(""),
    };

    return html;
};
