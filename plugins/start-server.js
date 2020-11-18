let started = false;

export default () => {
    if(!started) {
        started = true;
        require("child_process").spawn("npm", [ "run", "serve", "--", "--dev" ], {
            stdio : [ "ignore", "inherit", "inherit" ],
            shell : true,
        });
    }
};
