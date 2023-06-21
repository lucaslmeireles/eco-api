interface Category {
    id: number;
    name: string;
    desc: string;
}

interface Comment {
    id: number;
    user: User;
    content: string;
}

interface Post {
    id: number;
    img_cover: string;
    title: string;
    content: string;
    small_text: string;
    likes: number;
    coments: Comment[];
    author: User;
    category: Category[];
}

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    profile_pic: string;
    posts: Post[];
    liked: Post[];
    followers: User[];
    following: User[];
}
