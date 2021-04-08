import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'

import Button from 'react-bootstrap/Button'
import { BsDownload } from 'react-icons/bs'

import '../Styling/PostList.css'

function Download(props) {
    const { state: contextState } = useContext(AppContext)
    const image = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACx
                   jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG+SURBVFhH7VavT8NAFK7DLIF2JBgSJBKJgoldN4khwa3Z3ZJJJBLB/4BEIp
                   HI4SaRyElk5Sy87/radbfeeiNtCaFf8pK+d+/dvV/3el6LFn8eQageu6H6AgVifMfiZtC5HO3rg0M5C4R6IWeWkPFy/fDF5DyJ
                   Xt50htFJ+s3L9cMX41udgUF0Cp6+Y8j0YhPg+sfMel2hFiS7Z7ZeHF+M9uiwT9SeRToDjTmAg5D+w3ByBr7bi47A+6GMtEKdCP
                   qqh8NQAhZlDYk1Fv0c6GhslCde8g76aohUU7fPUQYWe5gBcAC3wGbrhNVG64R6U5M9JN9ylr/vSLupnyeyXaJXkCU2sQPKdNCT
                   GUW2mVDP+cgBOGPqrxH1CwIg2w82sYM93uhklpdvYIEOioJj1o4SB96Y3QmcBZ1ZFtlRhwNpj6C5WWRHHQ5kM8JlTFftQPKTkn
                   Oyj38lA5iUsHWekFU7sHozbO5ZiCodQPSBkO+wdRpCwHYH5CL997sA+2g7uoYsKgcMtk1CdmQWDOSVqWMSNd8r6WfvBSdgZucP
                   yxMdfK1fQfTwKFovIirBlLd2R1E0ZuoLdUzaoVwt/is87xv7nSk1NuRLDAAAAABJRU5ErkJggg==`

    // Create styles
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#E4E4E4',
        },
        header: {
            margin: 10,
            marginLeft: 25,
            marginBottom: 10,
            fontSize: 16,
        },
        post: {
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: 'black',
            borderTopStyle: 'solid',
        },
        postHeader: {
            maxWidth: '80%',
            fontSize: 12,
        },
        tags: {
            maxWidth: '80%',
            fontSize: 10,
            marginTop: 5,
        },
        postContent: {
            maxWidth: '80%',
            fontSize: 10,
            marginTop: 5,
        },
        postAuthor: {
            maxWidth: '80%',
            fontSize: 9,
            marginTop: 3,
        },
        comment: {
            marginLeft: 20,
            marginTop: 7,
        },
        commentContent: {
            maxWidth: '80%',
            fontSize: 10,
            marginTop: 2,
        },
        commentAuthor: {
            maxWidth: '80%',
            fontSize: 9,
            marginTop: 3,
        },
    })

    function tagsToString(index) {
        let tagString = '';
        let tags = contextState.posts[index].tags;
        tagString += tags[0];
        for (let i = 1; i < tags.length; i++)
        {
            tagString += ', ' + tags[i];
        }
        return tagString;
    }

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View style={styles.header}>
                        <Text>{contextState.discussionName !== '' ? contextState.discussionName : "Discussion"}</Text>
                    </View>
                    <View>
                        {console.log(contextState.posts)}
                        {contextState.posts.map((post, i) => (
                            <View key={i} style={styles.post}>
                                {console.log(post)}
                                <Text style={styles.postHeader}>{post.title}</Text>
                                {post.tags.length > 0 ? <Text style={styles.tags}>{'Tags: ' + tagsToString(i)}</Text> : null}
                                <Text style={styles.postContent}>{'Description: ' + post.content}</Text>
                                <Text style={styles.postAuthor}>
                                    {'-' + (post.isAnon ? 'Anonymous' : post.author) + '    '}
                                    <Image src={image}></Image>
                                    {' ' + post.upVotes}
                                </Text>
                                <View>
                                    {post.comments.map((comment, i) => (
                                        <View key={i} style={styles.comment}>
                                            <Text style={styles.commentContent}>{comment.content}</Text>
                                            <Text style={styles.commentAuthor}>
                                                {'-' + (comment.isAnon ? 'Anonymous' : comment.author) + '    '}
                                                <Image src={image}></Image>
                                                {' ' + comment.upVotes}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    )

    const generatePdfDocument = async () => {
        const blob = await pdf(<MyDocument />).toBlob()
        saveAs(blob, (contextState.discussionName !== '' ? contextState.discussionName : "Discussion") + '.pdf')
    }

    return (
        <div>
            <Button id="download" onClick={generatePdfDocument}>
                <BsDownload />
            </Button>
        </div>
    )
}

export default Download
