import React from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { getMetadata } from 'page-metadata-parser';
import domino from 'domino';
import { Grommet, grommet, Box, Heading, InfiniteScroll, Text, Anchor, TextInput, FormField } from 'grommet';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';


const GET_LINKS = (page = 2) => gql`
    {
        links(index:${page}){
            href
            content
        }
    }
`;

const GET_PAGES = gql`
    {
        pages
    }
`;

function Listings() {
    const history = useHistory();
    const [page, setPage] = React.useState(2);
    return (
        <Grommet full theme={grommet} >
            <Box fill="horizontal" >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Open La Voz
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box align="center" justify="center" >
                <Heading>Stories</Heading>
                <Box pad="medium" align="center" justify="center" size="medium" direction="row" >
                    <Query query={GET_PAGES} >
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>
                            if (error) return <div>Error</div>
                            return (
                                <Text style={{ paddingRight: "5vw" }}>
                                    Indexes: {data.pages}
                                </Text>
                            )
                        }}
                    </Query>
                    <FormField label="Search Index" >
                        <TextInput size="small" value={page} onChange={(e) => setPage(e.target.value)} />
                    </FormField>
                </Box>
                <Box size="medium" overflow="auto" align="center" justify="center">
                    <Query query={GET_LINKS(page || 2)} >
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>
                            if (error) return <div>Error</div>
                            return (
                                <Box align="start" justify="start">
                                    <List>
                                        <InfiniteScroll items={data.links}>
                                            {(item, key) => (
                                                <React.Fragment>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemText primary={
                                                            <React.Fragment>
                                                                <Anchor onClick={() => {
                                                                    history.push(`/story?href=${item.href}`)
                                                                }} key={key} label={item.content} size="medium" />
                                                            </React.Fragment>
                                                        } 
                                                        secondary={
                                                            <React.Fragment>
                                                                {}
                                                            </React.Fragment>
                                                        }
                                                        />
                                                    </ListItem>
                                                    <Divider component="li" />
                                                </React.Fragment>
                                            )}
                                        </InfiniteScroll>
                                    </List>
                                </Box>
                            )
                        }}
                    </Query>
                </Box>
            </Box>
        </Grommet>
    );
}

export default Listings;