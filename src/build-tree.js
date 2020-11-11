const fs = require("fs-extra");
const md = require("markdown-it")();
const glob = require("glob");

module.exports = (directory = false) => {
    if(!directory || !fs.existsSync(`${process.cwd()}/${directory}`)) {
        console.log("[Markdown HTML Docks] Please provide a directory relative to your working directory.");
        
        return;
    }

    const fullPath = `${process.cwd()}/${directory}`;
    const files = glob.sync(`${fullPath}/**/*.md`);

    const tree = {
        children : {},
    };
    
    // Adds the first segment of the path to the tree if it doesn't exist
    // then recursively handle the rest of the segments recursively.
    const pathToTree = (currentPath, html, markdown, treePosition = tree.children) => {
        // working segment is everything up until the next "/";
        const [ workingSegment = false, ...remainingSegments ] = currentPath.split("/");

        const reachedTheEnd = !remainingSegments.length;

        // Join the path back together without the first segment
        const nextPath = remainingSegments.join("/");

        const [ nextSegment ] = remainingSegments;
        
        const isRoot =  nextSegment === "index.md";
           
        const extractName = (str = "") => str.replace(/-/g, " ").replace(".md", "");

        // Allocate space for tree node if doesn't exist already
        treePosition[workingSegment] = treePosition[workingSegment] || { };

        treePosition[workingSegment] = {
            ...treePosition[workingSegment],

            name     : extractName(workingSegment),
            file     : workingSegment.replace(".md", ""),
            children : {
                ...treePosition[workingSegment].children || {},
            },
        };

        // If this is a section intro, add html to this level, and
        if(isRoot || reachedTheEnd) {
            treePosition[workingSegment].html = html;

            return;
        }

        pathToTree(nextPath, html, markdown, treePosition[workingSegment].children);
    };

    files.forEach((filePath) => {
        // Load html from markdown
        const markdown = fs.readFileSync(filePath);

        const html = md.render(markdown.toString());

        // Short path relative to their current working directory
        const shortPath = filePath.replace(`${process.cwd()}/${directory}/`, "");
        
        // Build tree and add html to corresponding tree node
        pathToTree(shortPath, html, markdown);
    });
    
    return tree;
};
