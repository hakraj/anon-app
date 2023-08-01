
/* The POST method adds a new entry in the mongodb database. */
const postData = async (post: { author: { email: string, name?: string }, note: { title: string, content: string, } }) => {

  const contentType = 'application/json'

  try {
    const res: Response = await fetch('/api/posts/', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(post),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

  } catch (error) {
    console.log('Failed to add post')
  }
}


/* The GET method finds a query entry in the mongodb database. */
const queryData = async (query: { qtitle?: string, qcontent?: string }) => {
  try {
    const { qtitle, qcontent } = query

    const url = new URL('/api/posts/query', window.location.href);
    qtitle && url.searchParams.set('qtitle', qtitle.trim())
    qcontent && url.searchParams.set('qcontent', qcontent.trim())

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Request failed');
    }

    const data = await res.json()

    if (data.success) {
      return (data.data)
    }
  } catch (error) {
    console.log('Failed to find post')
  }
}

// Fetch the latest posts data from the server
const getData = async () => {
  const response = await fetch('/api/posts');
  const data = await response.json();
  return (data.data);
};


/* The PUT method modifies entry in the mongodb database. */
const putData = async (newNote: { id: string, title?: string, content?: string, likes?: string[], comments?: {}[], }) => {

  const contentType = 'application/json'
  const { id } = newNote

  try {
    const res: Response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(newNote),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

  } catch (error) {
    console.log('Failed to add post')
  }
}



export { postData, queryData, getData, putData };