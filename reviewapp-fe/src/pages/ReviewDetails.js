import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

// GraphQL query to get a review by documentId
export const GET_REVIEW = gql`
  query GetReview($documentId: ID!) {
    review(documentId: $documentId) {
      title
      body
      rating
      documentId,
      categories{
          Name
          documentId
        }
    }
  }
`;


export default function ReviewDetails() {
 
  const { id } = useParams(); // Get the documentId from the URL parameters
  const { loading, error, data } = useQuery(GET_REVIEW, {
    variables: {
      documentId: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading review: {error.message}</p>;

  // Destructure the review data from the response
  const { title, body, rating, categories } = data.review;

  return (
    <div className="review-card">
      <div className="rating">{rating}</div>
      <h2>{title}</h2>
      <div>
             <small>Categories: {categories.map(cat => cat.Name).join(', ')}</small>
          </div>
      <div className="body">
        {/* Render body content if available */}
        {body && body.map((block, index) => (
          <p key={index}>{block.children[0]?.text}</p>
        ))}
      </div>
    </div>
  );
}
