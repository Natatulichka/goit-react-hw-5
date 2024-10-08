import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";
import { getReviewsMovie } from "../../services/api";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsMovie, setReviewsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsMovie = async () => {
      setIsLoading(true);
      setError(null);
      setIsEmpty(false);
      try {
        const data = await getReviewsMovie(movieId);
        if (!data.results.length) {
          return setIsEmpty(true);
        }
        setReviewsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewsMovie();
  }, [movieId]);

  return (
    <>
      <Section>
        {isEmpty && <span>Sorry,there are no reviews for this movie</span>}
        {reviewsMovie !== null &&
          reviewsMovie.results.map((reviewMovie) => {
            return (
              <div key={reviewMovie.id}>
                <h4 className={css.title}>{reviewMovie.author}</h4>
                <p className={css.text}>{reviewMovie.content}</p>
              </div>
            );
          })}
        {isLoading && <Loader />}
        {error && <span>error</span>}
      </Section>
    </>
  );
}

export default MovieReviews;
