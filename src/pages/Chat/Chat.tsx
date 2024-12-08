import { Box, Container, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

// ... rest of imports ...

// Update the onChange handler
onChange={(e: SelectChangeEvent<string>) => setSelectedProduct(e.target.value)}