import React, { useContext, useState } from "react";
import { API, AppContext } from "../AppContext";
import  { PDFDownloadLink, Page, Text, View, Document, StyleSheet, pdf} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { BsDownload } from 'react-icons/bs'

import '../Styling/PostList.css';

function Download(props)
{
    const { state: contextState } = useContext(AppContext);

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },
        header: {
            margin: 10,
            marginLeft: 25,
            marginBottom: 0,
            fontSize: 16
        },
        post: {
            marginLeft: 30,
            marginTop: 10,
            maxWidth: "80%",
        },
        postHeader: {
            fontSize: 12,
            marginTop: 10,
        },
        postContent: {
            fontSize: 10,
            marginTop: 2,
        },
        postAuthor: {
            fontSize: 9,
            marginTop: 2,
        },
        comment: {
            marginLeft: 15,
            marginTop: 5
        },
        commentContent: {
            fontSize: 10,
            marginTop: 2
        },
        commentAuthor: {
            fontSize: 9,
            marginTop: 2,
        }

    });

    const MyDocument = () => (
            <Document>
            <Page wrap={false} size="A4" style={styles.page}>
                <View>
                    <View style={styles.header}>
                        <Text>Discussion</Text>
                    </View>
                    <View>
                        {console.log(contextState.posts)}
                        {contextState.posts.map((post, i) => (
                            <View key={i} style={styles.post}>
                                {console.log(post)}
                                <Text style={styles.postHeader}>{post.title}</Text>
                                <Text style={styles.postContent}>{post.content}</Text>
                                <Text style={styles.postAuthor}>{"-" + post.author}</Text>
                                <View>
                                    {post.comments.map((comment, i) => (
                                        <View key={i} style={styles.comment}>
                                            <Text style={styles.commentContent}>{comment.content}</Text>
                                            <Text style={styles.commentAuthor}>{"-" + comment.author}</Text>
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
        console.log("generate")
        const blob = await pdf((
            <MyDocument />
        )).toBlob();
        saveAs(blob, "Discussion.pdf");
};

    return (
        <div>
            <Button id="download">
                <BsDownload onClick={generatePdfDocument} />
            </Button>
        </div>
    )
}

export default Download;