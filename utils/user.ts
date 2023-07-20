import { Session } from "next-auth"

// confirm user and update if neccesary
const confirmUser = async (session: Session) => {

  const updatedUser = session?.user

  const contentType = 'application/json'

  try {
    const res: Response = await fetch('/api/users/', {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(updatedUser),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

    const data = await res.json()

    return { sucesss: true, data: data }

  } catch (error) {
    return { sucesss: false, error: error }
  }
}

// create a new user in the db
const PostUser = async (user: { email: string, password?: string, name?: string, image?: string }) => {
  const contentType = 'application/json'

  try {
    const res: Response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(user),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

    const data = await res.json()

    return { sucesss: true, data: data }

  } catch (error) {
    return { sucesss: false, error: error }
  }
}

// confirm user and update if neccesary
const onboardUser = async (user: { email: string, password?: string, name?: string, image?: string }) => {

  const updatedUser = user

  const contentType = 'application/json'

  try {
    const res: Response = await fetch('/api/users/', {
      method: 'PUT',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(updatedUser),
    })

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

    const data = await res.json()

    return { sucesss: true, data: data }

  } catch (error) {
    return { sucesss: false, error: error }
  }
}

const getUser = async (user: { email?: string, password?: string, name?: string, image?: string }) => {
  try {

    const { email, password, name, image } = user;

    const url = new URL('/api/users', "https://anon-app-git-notify-hakraj.vercel.app");
    email && url.searchParams.set('email', email.trim())
    password && url.searchParams.set('password', password.trim())
    name && url.searchParams.set('name', name.trim())
    image && url.searchParams.set('image', image.trim())
    const res = await fetch(url.toString(), { cache: 'no-store' });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString())
    }

    const User = await res.json()

    return { sucesss: true, data: User.data }

  } catch (error) {
    return { sucesss: false, error: error }
  }
}



export { confirmUser, PostUser, onboardUser, getUser };