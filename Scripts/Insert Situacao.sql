SELECT TOP (1000) [ID]
      ,[Situacao]
  FROM [VitalHub_G09M].[dbo].[Situacoes]

  USE [VitalHub_G09M]

  insert into Situacoes values
  (NEWID(),'Normal'),
  (NEWID(),'Grave')