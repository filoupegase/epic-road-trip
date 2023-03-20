import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";


interface CardActionsCategoryProps {
    label: string
    icon: JSX.Element
}

const CardActionsCategory = ({ label, icon }: CardActionsCategoryProps) => {
    return (
        <>
            <Card sx={ { width: '100%' } } elevation={ 0 }>
                <StyledSelectBox>
                    <Typography>{ label }</Typography>
                    { icon }
                </StyledSelectBox>
            </Card>
        </>
    )
}

const StyledSelectBox = styled(CardActionArea)(({ theme }) => ({
    border: `solid 1px ${ theme.palette.primary.main }`,
    borderRadius: 15,
    padding: "11px 16px",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 67
}));

export default CardActionsCategory;
