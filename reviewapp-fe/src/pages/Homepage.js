import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const REVIEWS = gql`
  query GetReviews{
    reviews{
      title,
      body,
      documentId,
      rating
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  console.log('Fetched Reviews:', data);

  return (
    <div>
      {data.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>
          <small>Console List</small>
          {/* Display text from body */}
          <p>
            {review.body[0]?.children[0]?.text.substring(0, 200)}...
          </p>
          <Link to={`api/details/${review.documentId}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
