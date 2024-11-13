import React from 'react'
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'


const CATEGORIES = gql`

  query GetCategories{
    categories{
    Name,
    documentId
    }
  }
`


export default function SiteHeader() {

  const { id } = useParams(); // Get the documentId from the URL parameters
  const { loading, error, data } = useQuery(CATEGORIES, {
    variables: {
      id: id,
    },
  });

  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className='site-header'>
        <Link to="/"><h1>Reviews Application</h1></Link>

        <nav className='categories'>
          <span>Filter reviews by categories:</span>
          {data.categories.map(category =>(
            <Link key={category.documentId} to={`api/category/${category.documentId}`}>
              {category.Name}
            </Link>
          ))}
        </nav>
    </div>
  )
}
