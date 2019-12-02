import React from 'react';
import queryString from "query-string"
import { Grommet, grommet, Text, Box, Heading } from 'grommet';

function Story({ match, location }) {
    const HREF = queryString.parse(location.search).href;

    if(!HREF) {
        return(
            <Grommet theme={grommet} >
                <Box align="center" justify="center" >
                    <Heading>No Story in url query.</Heading>
                </Box>
            </Grommet>
        )
    }
    return (
        <Grommet theme={grommet} >
            <Text>
                {HREF}
            </Text>
        </Grommet>
    )
}

export default Story;