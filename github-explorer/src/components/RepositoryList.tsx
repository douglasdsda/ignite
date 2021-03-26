import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";
import { useEffect, useState } from "react";

interface Repository {
  name: string;
  description: string;
  html_url: string;
  id: number;
}

export function RepositoryList() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/rocketseat/repos`)
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repos.map((item: Repository) => {
          return <RepositoryItem key={item.id} repository={item} />;
        })}
      </ul>
    </section>
  );
}
