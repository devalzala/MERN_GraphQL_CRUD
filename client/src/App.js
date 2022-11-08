import { useQuery, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_POST, DELETE_POST } from "./GraphQl/Mutation";
import { getAll } from "./GraphQl/Query";

const App = () => {
  const { loading, error, data } = useQuery(getAll);
  const [createPost, { err }] = useMutation(CREATE_POST);
  const [deletePost, { erro }] = useMutation(DELETE_POST);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const addPost = () => {
    createPost({
      variables: {
        title: title,
        description: description,
      },
    });
  };

  const removePost = (id) => {
    deletePost({
      variables: {
        id: id,
      },
    });
  };

  if (loading) return "Loading";
  if (error) return "Error";
  if (data) console.log(data);

  const handleClick = () => {
    addPost();
    window.location.reload();
  };

  return (
    <div>
      {data?.getAll?.map((item, index) => (
        <div key={index}>
          <p>
            {item.title} *** {item.description}
          </p>
          <button onClick={() => removePost(item?.id)}>Delete</button>
        </div>
      ))}
      <br />
      <input onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <br />
      <input
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />
      <button onClick={handleClick}>Add Post</button>
    </div>
  );
};

export default App;
