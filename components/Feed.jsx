'use client';

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'



const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const Search = async (searchText) => {
        console.log("#####");
        console.log(searchText);
        const response = await fetch('/api/prompt', {
            method: 'POST',
            body: JSON.stringify({
                searchText: searchText
            })
        });
        const data = await response.json();
        setPosts(data);
    }


    const handleSearchChange = (e) => {
        let value;
        if (typeof e === 'string') {
            value = e;
        } else {
            value = e.target.value;
        }
        setSearchText(value);
        Search(value);
    }

    const PromptCardList = ({ data, handleTagClick }) => {
        return (
            <div className='mt-16 prompt_layout'>
                {data.map((post) => (<PromptCard
                    key={post.id}
                    post={post}
                    handleTagClick={handleTagClick}
                />))}
            </div>
        )
    };


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        }

        fetchPosts();
    }, [])


    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type="text"
                    placeholder='Search for a tag or a Prompt'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleSearchChange}
            />
        </section>
    )
}

export default Feed