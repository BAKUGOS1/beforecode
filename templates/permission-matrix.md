# Permission Matrix

## Roles

List all roles.

```text
Admin
Manager
User
Guest
```

## Access Table

| Feature | Admin | Manager | User | Guest |
|---|---|---|---|---|
| View | Yes | Yes | Yes | No |
| Create | Yes | Yes | Yes | No |
| Update | Yes | Yes | Own only | No |
| Delete | Yes | No | Own only | No |

## Notes

Add special access rules and exceptions.
