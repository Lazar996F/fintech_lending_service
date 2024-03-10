"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const getUserData = async () => {
    const res = await fetch("http://localhost:5000/users", {
      method: "Get",
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    const response = await res.json();
    setPosts(response);
  };
  
  return (
    <div>
      <button onClick={getUserData}>Click to see financial data</button>
      {posts && JSON.stringify(posts)}
    </div>
  );
};

export default HomePage;