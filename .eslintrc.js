module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "curly": ["error", "multi-or-nest"],
        "no-console": "off",
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        "eol-last": "error",
        "no-param-reassign": ["error", { 
            //parsedArgs has an error and message prop that should be modified by consumers
            "props": true, 
            "ignorePropertyModificationsFor": ["parsedArgs"] 
        }],
        "no-unused-vars": ["error", {
            "args":"none"
        }],
        "class-methods-use-this": "off",
        "no-use-before-define": ["error", { 
            "functions": false 
        }],
        "linebreak-style": 0
    }
};
