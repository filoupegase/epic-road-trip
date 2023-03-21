import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import useSWR from "swr";
import { ResponseError } from "@/interface";
import styled from "styled-components";
import Header from "@/_common/components/Header";


const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function PostPage() {
    const { query } = useRouter();
    const { data, error, isLoading, isValidating } = useSWR<
        string,
        ResponseError
    >(() => (query.id ? `/api/post/${ query.id }` : null), fetcher)

    if (!data) return null

    return (
        <>
            <StyledTypo color={ 'secondary' } variant='h3'><StyledSpan>Explorez</StyledSpan> { data }</StyledTypo>
        </>
    )
}

const StyledTypo = styled(Typography)(({}) => ({
    textTransform: 'capitalize'
}));

const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.primary.main
}))
