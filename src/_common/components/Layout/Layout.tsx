import * as React from "react";
import type { PropsWithChildren } from "react";
import { Container } from "@mui/material";
import Header from "../Header";
import styled from 'styled-components';


const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <StickyHeader />
            <Container>
                { children }
            </Container>
        </>
    )
};

const StickyHeader = styled(Header)`
  position: sticky;
  top: 0;
`

export default Layout;
