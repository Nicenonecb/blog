

"use client"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React, {useEffect} from "react";

let VisuallyHiddenInput;

if (typeof window !== "undefined") {
    VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
} else {
    VisuallyHiddenInput = "input"; // 使用一个普通的input作为备用，如果不在浏览器环境中
}


export default  function  TranslatePage(){


        // 这里的代码只会在客户端执行

    return (
        <>

            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                {/*<VisuallyHiddenInput type="file" />*/}
            </Button>
        </>
    )
}