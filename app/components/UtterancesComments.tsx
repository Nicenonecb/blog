import React, { useEffect } from 'react';

const UtterancesComments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://utteranc.es/client.js";
        script.async = true;
        script.setAttribute("repo", "blog");
        script.setAttribute("issue-term", "https://blog-three-green-37.vercel.app/posts");
        script.setAttribute("theme", "github-light");
        script.setAttribute("crossorigin", "anonymous");

        const scriptParentNode = document.getElementById("comments");
        scriptParentNode.appendChild(script);

        return () => {
            scriptParentNode.removeChild(scriptParentNode.firstChild);
        };
    }, []);

    return <div id="comments"></div>;
};

export default UtterancesComments;
