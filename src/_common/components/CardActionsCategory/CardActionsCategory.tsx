import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";


interface CardActionsCategoryProps {
    label: string
}

const CardActionsCategory = ({ label }: CardActionsCategoryProps) => {
    return (
        <>
            <Card elevation={ 0 }>
                <StyledSelectBox>
                    <Typography>{ label }</Typography>
                </StyledSelectBox>
            </Card>
        </>
    )
}

const StyledSelectBox = styled(CardActionArea)(({ theme }) => ({
    border: `solid 1px ${ theme.palette.primary.main }`,
    borderRadius: 4,
    padding: "11px 16px"
}));

export default CardActionsCategory;
