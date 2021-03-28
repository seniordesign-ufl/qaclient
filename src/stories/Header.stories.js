import React from 'react'

import Header from '../components/Header'

export default {
    title: 'Header',
    component: Header,
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
    state: {
        userId: null,
        displayName: null,
        roomKey: null,
        posts: [],
        users: [],
        search_phrase: '',
        filter_by: '',
        admin: false,
    },
}
