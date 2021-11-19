import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useGlobalState } from "store/global";
import Header from "components/header";
import Greetings from "components/greeting";
import Login from "components/login";
import "app.scss";

const App = (): React.ReactElement => {
    const { user } = useGlobalState();

    return (
        <Grid h="100vh" templateRows="repeat(6, 1fr)" templateColumns="repeat(5, 1fr)" gap={0}>
            <GridItem rowSpan={1} colSpan={5} bg="tomato">
                <Header />
            </GridItem>
            <GridItem colSpan={5} rowSpan={4} bg="white">
                <Container maxW="xl">{user ? <Greetings /> : <Login />}</Container>
            </GridItem>
            <GridItem colSpan={5} rowSpan={1} bg="tomato" />
        </Grid>
    );
};
export default App;
