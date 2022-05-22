
  
  export type comicObject = {
    id: number,
    title: String,
    thumbnail: {
      path: String,
      extension: String,
    },
  };

  export type fetchedComic = {
    data: {
      results: Array<comicObject> ;
      count: number;
    };
  };

  export type storedComicObject = {
    newState: {
      id: number,
      title: String,
      thumbnail: {
        path: String,
        extension: String,
      },

    };
  };



  export {};