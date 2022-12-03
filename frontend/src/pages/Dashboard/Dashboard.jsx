import React from "react";
import styled from "styled-components";

const Dashboard = () => {

    const Container = styled.div`
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    return (
        <Container>
            <p>You're logged in!</p>
        </Container>
    )

}

export default Dashboard;
