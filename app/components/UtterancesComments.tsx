"use client"
import React, { useEffect } from 'react';

const UtterancesComments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://utteranc.es/client.js";
        script.async = true;
        script.setAttribute("repo", "您的GitHub用户名/存储库名");
        script.setAttribute("issue-term", "pathname");
        script.setAttribute("theme", "github-light");
        script.setAttribute("crossorigin", "anonymous");

        const scriptParentNode = document.getElementById("comments");
        if (scriptParentNode) {
            scriptParentNode.appendChild(script);

            return () => {
                // 确保子元素存在再尝试移除
                if (scriptParentNode.firstChild) {
                    scriptParentNode.removeChild(scriptParentNode.firstChild);
                }
            };
        }
    }, []);

    return <div id="comments"></div>;
};

export default UtterancesComments;
