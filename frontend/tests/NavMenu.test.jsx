import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import NavMenu from '../src/components/NavMenu.jsx';
import { AuthContext } from '../src/context/AuthContext.jsx';
import { InstallContext } from '../src/context/InstallContext.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('NavMenu', () => {
  it('renders menu for authenticated users', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: { id: 1 }, loading: false }}>
          <InstallContext.Provider value={{ installed: true }}>
            <NavMenu />
          </InstallContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders nothing for unauthenticated users', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user: null, loading: false }}>
          <InstallContext.Provider value={{ installed: true }}>
            <NavMenu />
          </InstallContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
