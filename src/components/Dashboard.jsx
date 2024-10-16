import React from 'react'

const Dashboard = ({postList}) => {
  return (
    <div className="album py-5 bg-body-tertiary">
    <div className="container-fluid">``

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      
        {postList?.map(({title, body, userId, reactions, tags, views}, ind) => <div key={ind} className="postCard col">
          <div className="card shadow-sm h-100">
            <img src="https://mwpt.com.br/wp-content/uploads/2020/02/ilustracao-site-pessoas.jpg" alt="blog_img" />
            <div className="card-body">
              <h1 className='fw-bold'>{title}</h1>
              <p className="card-text">{body}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  {tags.map((tag, ind) => <button key={ind} type="button" className="btn btn-sm btn-outline-secondary">#{tag}</button>)}
                </div>
                <small className="text-body-secondary">{userId}</small>
                <small className="text-body-secondary">VIEWS-{views}</small>
              </div>

            </div>
              <button type='button' className='btn btn-warning'>EDIT</button>
          </div>
        </div>)}

        

      </div>
    </div>
  </div>
  )
}

export default Dashboard
