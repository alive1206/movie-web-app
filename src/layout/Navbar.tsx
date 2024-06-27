type Props = {};

export const Navbar: React.FC<Props> = () => {
  return (
    <div>
      <div className="container">
        <div className="flex justify-between">
          <ul className="list-none flex gap-5 m-x-0">
            <li>Home</li>
            <li>Search</li>
            <li>Watchlist</li>
            <li>Categories</li>
            <li>Movie</li>
            <li>Series</li>
            <li>About Us</li>
          </ul>

          <div className="flex gap-8">
            <ul className="flex list-none gap-5">
              <li>insta</li>
              <li>x</li>
              <li>fb</li>
            </ul>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
