import Head from "next/head";
import Image from "next/image";
import { FormEvent, useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
 
import styles from "../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      password,
      email,
    };
 

   await signIn({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
