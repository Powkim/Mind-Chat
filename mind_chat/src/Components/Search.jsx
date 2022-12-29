const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>

      <div className="userChat">
        <img
          src="https://user-images.githubusercontent.com/107850055/209948703-4e6fd20a-6884-4b19-89f1-66c9cfccdd05.jpg"
          alt=""
        />
        <div className="userChatInfo">
          <span>displayName</span>
        </div>
      </div>
    </div>
  );
};
export default Search;
