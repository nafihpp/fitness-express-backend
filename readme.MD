### API Reference

Live Deployed Backend URL : `https://firefly-task.vercel.app/api`


#### 1. **Favourites Routes**:

##### **Get All Favourite Pokémon**

```http
  GET /api/favourite
```

| Response | Type        | Description                                   |
| :------- | :---------- | :-------------------------------------------- |
| `200`    | `Array[Pokemon]` | Returns a list of all favourite Pokémon.       |

##### **Add a Pokémon to Favourite**

```http
  POST /api/favourite
```

| Body         | Type     | Description                                        |
| :----------- | :------- | :-----------------------------------------------   |
| `id`   | `string` | **Required**. The unique ID of the Pokémon to be added.  |
| `name` | `string` | **Required**. The unique name of the Pokémon to be added.|

| Response    | Type    | Description                                    |
| :---------- | :------ | :--------------------------------------------- |
| `201`       | `Object` | Returns the added Pokémon object with success status. |

##### **Remove a Pokémon from Favourite**

```http
  DELETE /api/favourite/:id
```

| Parameter  | Type     | Description                                   |
| :--------- | :------- | :-------------------------------------------- |
| `id`       | `number` | **Required**. The name of the Pokémon to be removed from favourites. |

| Response    | Type    | Description                                    |
| :---------- | :------ | :--------------------------------------------- |
| `200`       | `Object` | Returns a success message confirming removal. |


#### 2. **Pokémon Routes**:

##### **Get All Pokémon**

```http
  GET /api/pokemon
```


| Response   | Type       | Description                                    |
| :--------- | :--------- | :--------------------------------------------- |
| `200`      | `Array[Pokemon]` | Returns a list of Pokémon with their details. |

##### **Get Specific Pokémon by ID**

```http
  GET /api/pokemon/:id
```

| Parameter  | Type     | Description                                    |
| :--------- | :------- | :--------------------------------------------- |
| `id`       | `number` | **Required**. The ID of the Pokémon to retrieve. |

| Response   | Type       | Description                                    |
| :--------- | :--------- | :--------------------------------------------- |
| `200`      | `Pokemon`  | Returns the details of the specific Pokémon.   |

---


### Details:

- **`GET /api/favourite`**: This route retrieves a list of all Pokémon added to the user's favourites. It returns an array of Pokémon objects.
  
- **`POST /api/favourite`**: This route allows a user to add a Pokémon to their favourites list by passing the `id` and `name` in the body.

- **`DELETE /api/favourite/:id`**: This route removes a Pokémon from the favourites list using the Pokémon's `id`. A success message is returned.

- **`GET /api/pokemon`**: This route fetches all available Pokémon.

- **`GET /api/pokemon/:id`**: This route retrieves a specific Pokémon by its `id`. It returns detailed information about the requested Pokémon.

---
