import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const lightTheme = {
  bg: 'var(--color-bg)',
  text: 'var(--color-text)',
  accent: 'var(--color-accent)',
  accentLight: 'var(--color-accent-light)',
  accentDark: 'var(--color-accent-dark)',
  gray: 'var(--color-gray)',
  footer: 'var(--color-footer)',
};

const darkTheme = {
  bg: 'var(--color-bg)',
  text: 'var(--color-text)',
  accent: 'var(--color-accent)',
  accentLight: 'var(--color-accent-light)',
  accentDark: 'var(--color-accent-dark)',
  gray: 'var(--color-gray)',
  footer: 'var(--color-footer)',
};

const Header = styled.header`
  padding: 4rem 0 2rem 0;
  text-align: center;
  animation: fadeIn 1s ease;

  h1 {
    font-size: 3rem;
    letter-spacing: -1px;
    margin-bottom: 0.5rem;
    font-family: var(--font-heading);
  }
  h2 {
    font-size: 1.3rem;
    font-weight: 400;
    color: ${({ theme }) => theme.accent};
    margin-top: 0;
    font-family: var(--font-body);
    letter-spacing: 0.5px;
  }
`;

const AboutSection = styled.section`
  max-width: 600px;
  margin: 0 auto 3rem auto;
  padding: 2rem 1.5rem 0 1.5rem;
  text-align: center;
  animation: fadeIn 1.2s ease;

  h3 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.15rem;
    color: ${({ theme }) => theme.text};
    line-height: 1.8;
    font-family: var(--font-body);
  }
`;

const fadeInKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s, color 0.3s;
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 1.7rem;
  cursor: pointer;
  z-index: 100;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accentLight};
  }
`;

const GlobalStyle = createGlobalStyle`
  body[data-theme='dark'] {
    background: var(--color-bg);
    color: var(--color-text);
  }
  ${fadeInKeyframes}
`;

const ProjectsSection = styled.section`
  max-width: 1100px;
  margin: 0 auto 3rem auto;
  padding: 2rem 1.5rem 0 1.5rem;
  animation: fadeIn 1.3s ease;

  h3 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 2rem;
    text-align: center;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 2rem;
  }
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.gray};
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(44, 44, 84, 0.04);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 210px;
  transition: box-shadow 0.2s, transform 0.2s;
  animation: fadeIn 1.5s ease;

  &:hover {
    box-shadow: 0 4px 24px rgba(44, 44, 84, 0.10);
    transform: translateY(-4px) scale(1.02);
  }

  h4 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.accent};
  }
  .desc {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.7rem;
  }
  .stack {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.accentDark};
    margin-bottom: 1rem;
    font-family: var(--font-body);
  }
  .links {
    margin-top: auto;
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.accentLight};
      text-decoration: underline;
    }
  }
`;

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/sanketInTech/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{textAlign: 'center'}}>Loading projects...</p>;
  if (!repos.length) return <p style={{textAlign: 'center'}}>No projects found.</p>;

  return (
    <ProjectsSection>
      <h3>Projects</h3>
      <div className="projects-grid">
        {repos.map(repo => (
          <ProjectCard key={repo.id}>
            <h4>{repo.name}</h4>
            <div className="desc">{repo.description || 'No description provided.'}</div>
            <div className="stack">{repo.language ? `Tech: ${repo.language}` : ''}</div>
            <div className="links">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">GitHub</a>
              {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            </div>
          </ProjectCard>
        ))}
      </div>
    </ProjectsSection>
  );
}

const BlogSection = styled.section`
  max-width: 900px;
  margin: 0 auto 3rem auto;
  padding: 2rem 1.5rem 0 1.5rem;
  animation: fadeIn 1.4s ease;

  h3 {
    font-size: 2rem;
    font-family: var(--font-heading);
    margin-bottom: 2rem;
    text-align: center;
  }
  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const BlogCard = styled.div`
  background: ${({ theme }) => theme.gray};
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(44, 44, 84, 0.04);
  padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  animation: fadeIn 1.5s ease;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 24px rgba(44, 44, 84, 0.10);
    transform: translateY(-4px) scale(1.01);
  }

  h4 {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.accent};
  }
  .excerpt {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.7rem;
    font-family: var(--font-body);
  }
  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.accentLight};
      text-decoration: underline;
    }
  }
`;

const ViewAllButton = styled.a`
  display: block;
  margin: 2rem auto 0 auto;
  padding: 0.7rem 2.2rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s;
  width: max-content;
  box-shadow: 0 2px 8px rgba(44, 44, 84, 0.07);
  &:hover {
    background: ${({ theme }) => theme.accentLight};
  }
`;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use rss2json to fetch Medium RSS feed as JSON
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sanketdesai1971')
      .then(res => res.json())
      .then(data => {
        setPosts(data.items ? data.items.slice(0, 4) : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{textAlign: 'center'}}>Loading blog posts...</p>;
  if (!posts.length) return <p style={{textAlign: 'center'}}>No blog posts found.</p>;

  return (
    <BlogSection>
      <h3>Blog</h3>
      <div className="blog-list">
        {posts.map(post => (
          <BlogCard key={post.guid}>
            <h4>{post.title}</h4>
            <div className="excerpt">{post.description.replace(/<[^>]+>/g, '').split('. ').slice(0, 2).join('. ') + '.'}</div>
            <a href={post.link} target="_blank" rel="noopener noreferrer">Read on Medium</a>
          </BlogCard>
        ))}
      </div>
      <ViewAllButton href="https://medium.com/@sanketdesai1971" target="_blank" rel="noopener noreferrer">View all</ViewAllButton>
    </BlogSection>
  );
}

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.footer};
  color: #fff;
  padding: 3rem 1.5rem 2rem 1.5rem;
  text-align: center;
  animation: fadeIn 1.5s ease;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;

  .about {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
    font-family: var(--font-body);
  }
  .contact {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #e0e0e0;
    font-size: 1rem;
  }
  .links {
    display: flex;
    justify-content: center;
    gap: 2.2rem;
    margin-bottom: 1.5rem;
  }
  a {
    color: var(--color-accent-light);
    font-size: 1.5rem;
    transition: color 0.2s;
    &:hover {
      color: var(--color-accent);
    }
  }
  .copyright {
    font-size: 0.95rem;
    color: #bdbdbd;
    margin-top: 1.5rem;
  }
`;

function Footer() {
  return (
    <FooterSection>
      <div className="about">
        Hey, I’m Sanket—a Web Developer passionate about building robust backend systems with Java | SpringBoot | Rest API & MySQL. Turning code into scalable solutions.
      </div>
      <div className="contact">
        <span><FiPhone style={{verticalAlign: 'middle'}} /> +91 7218690805</span>
        <span><FiMail style={{verticalAlign: 'middle'}} /> sanketdesai1971@gmail.com</span>
      </div>
      <div className="links">
        <a href="https://www.linkedin.com/in/sanket-desai-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
        <a href="https://github.com/sanketInTech" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
        <a href="https://x.com/IAmSanket_21" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FiTwitter /></a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Sanket Desai. All rights reserved.
      </div>
    </FooterSection>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : '');
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <ThemeToggle onClick={() => setDarkMode((d) => !d)} aria-label="Toggle dark mode">
          {darkMode ? <FiSun /> : <FiMoon />}
        </ThemeToggle>
        {/* Header */}
        <Header>
          <h1>Sanket</h1>
          <h2>Web Developer | Java, Spring Boot, React</h2>
        </Header>
        {/* About Section */}
        <AboutSection>
          <h3>About</h3>
          <p>Web developer using Java, Spring Boot, and React. Writing about backend systems, algorithms, and clean code. Building things that work. Sharing lessons learned.</p>
        </AboutSection>
        {/* Projects Section */}
        <Projects />
        {/* Blog Section */}
        <Blog />
        {/* Footer */}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App; 