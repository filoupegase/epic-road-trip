import * as React from "react";
import type { PropsWithChildren } from "react";
import { Container } from "@mui/material";


const Layout = ({ children }: PropsWithChildren) => {
    return (<Container>{ children }</Container>)
}

export default Layout;
