SELECT TOP (1000) [ID]
      ,[Medicamento]
      ,[Observacoes]
  FROM [VitalHub_G09M].[dbo].[Receitas]

  USE [VitalHub_G09M]

  insert into Receitas values
  (NEWID(),'Dorflex','Xarope')