import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, createNewPost, removePost } from '../features/posts/postSlice';
import '../components/postStyle.css';
import { Button } from 'react-bootstrap';

const PostStructure = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [filterName, setFilterName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      alert('Por favor completa todos los campos.');
      return;
    }

    dispatch(createNewPost(formData));
    setFormData({
      name: '',
      description: ''
    });
  };

  const handleDeletePost = (postId) => {
    dispatch(removePost(postId));
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div className="post-container">
      <div className="left-section">
        <h3>Listado de Posts</h3>
        <hr />
        <input
          type="text"
          placeholder="Ingrese el nombre para filtrar..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ marginBottom: '0px' }}
        />
        <hr style={{ margin: '1rem 0px 0px 0px' }} />
        {filteredPosts.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>No hay posts disponibles</p>
        ) : (
          <ul className="post-list">
            {filteredPosts.map(post => (
              <li key={post.id} className="post-item">
                <div className="post-content">
                  <h4>{post.name}</h4>
                  <p>{post.description}</p>
                </div>
                <div className="post-actions">
                  <Button variant="danger" onClick={() => handleDeletePost(post.id)}>Eliminar</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="right-section">
        <div className="form-section">
          <h3>Crear Post</h3>
          <hr />
          <form onSubmit={handleAddPost}>
            <label htmlFor="name" className="labelPost">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese nombre del post..."
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="description" className="labelPost">Descripción</label>
            <textarea
              className="textAreaForm"
              id="description"
              name="description"
              placeholder="Ingrese descripción del post..."
              value={formData.description}
              onChange={handleChange}
              required
            />

            <button type="submit">Crear Nuevo Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostStructure;