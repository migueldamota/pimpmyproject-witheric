const loaderUtils = require("loader-utils");
const path = require("path");

module.exports = (config, env) => {

    config.output.filename = "assets/app.js";
    config.output.assetModuleFilename = "assets/[name][ext]";

    config.module.rules[1].oneOf[8].use[1].options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
        const hash = loaderUtils.getHashDigest(
            path.posix.relative(context.rootContext, context.resourcePath) + localName,
            "sha256",
            "hex",
            6,
        );
        const className = loaderUtils.interpolateName(
            context,
            localName + "-" + hash,
            options,
        );
        return className.replace(".module", "__").replace(/\./g, "_");
    }

    config.plugins[5].options.filename = "assets/app.css";

    return config;
}
