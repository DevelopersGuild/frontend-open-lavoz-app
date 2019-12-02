import React from 'react';
import queryString from "query-string"
import { Grommet, grommet, Text } from 'grommet';

function Story({ match, location }) {
    const HREF = queryString.parse(location.search).href;

    if(!HREF) {
        return(
            <Grommet theme={grommet} >

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