# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj first (better layer caching)
COPY src/GMCompanion.Api/GMCompanion.Api.csproj GMCompanion.Api/
RUN dotnet restore GMCompanion.Api/GMCompanion.Api.csproj

# copy everything else
COPY . .
RUN dotnet publish src/GMCompanion.Api/GMCompanion.Api.csproj -c Release -o /app/publish


# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "GMCompanion.Api.dll"]
