import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    activeClassName?: string;
    exact?: boolean;
    end: boolean
    children: React.ReactNode;
}

export const NavLink = ({ to, activeClassName = 'active', exact = false, end = false, children }: NavLinkProps) => {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : end ? location.pathname === to : location.pathname.startsWith(to);

    return (
        <Link to={to} className={isActive ? activeClassName : ''}>
            {children}
        </Link>
    );
};


