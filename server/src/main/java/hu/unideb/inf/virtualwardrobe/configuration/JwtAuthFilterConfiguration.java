package hu.unideb.inf.virtualwardrobe.configuration;

import hu.unideb.inf.virtualwardrobe.service.JwtAuthService;
import hu.unideb.inf.virtualwardrobe.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilterConfiguration extends OncePerRequestFilter {

    @Autowired
    private JwtAuthService jwtAuthService;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Cookie");
        final String jwt;
        final String email;

        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWithIgnoreCase(authHeader, "jwt=")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(4);
        email = jwtAuthService.extractEmail(jwt);

        if (StringUtils.isNotEmpty(email) && SecurityContextHolder.getContext().getAuthentication() == null) {
            authenticateUser(request, jwt, email);
        }

        filterChain.doFilter(request, response);
    }

    private void authenticateUser(HttpServletRequest request, String jwt, String email) {
        UserDetails userDetails = userService.getUserDetailsService().loadUserByUsername(email);

        if (jwtAuthService.validateToken(jwt, userDetails)) {
            setSecurityContext(request, userDetails);
        }
    }
    private void setSecurityContext(HttpServletRequest request, UserDetails userDetails) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, Collections.emptyList());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        context.setAuthentication(authenticationToken);
        SecurityContextHolder.setContext(context);
    }
}
