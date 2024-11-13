import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

export const GET_CATEGORY = gql`
  query getCategory($documentId: ID!){
    category(documentId: $documentId){
      Name
      documentId
      reviews{
        title
        body
        rating
        documentId
        categories{
          Name
          documentId
        }
      }
    }
  }
`;

export default function Category() {

  const { id } = useParams(); // Get the documentId from the URL parameters
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      documentId: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading category list: {error.message}</p>;

  // If data exists, extract the category details and reviews
  const category = data?.category;
  const reviews = category?.reviews || [];

  return (
    <div>
      <h1>Category: {category?.Name}</h1>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available for this category.</p>
      ) : (
        <div>
          {reviews.map((review) => (
            <div key={review.documentId} className="review-card">
              <div className="rating">{review.rating}</div>
              <h3>{review.title}</h3>
              <div>
                <small>Categories: {review.categories.map(cat => cat.Name).join(', ')}</small>
              </div>
              <p>{review.body[0].children[0]?.text}</p>
              <Link to={`/api/details/${review.documentId}`}>Read more</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
