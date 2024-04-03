SELECT TOP (1000) [ID]
      ,[SituacaoID]
      ,[PacienteID]
      ,[MedicoClinicaID]
      ,[ReceitaID]
      ,[PrioridadeID]
      ,[DataConsulta]
      ,[Descricao]
      ,[Diagnostico]
  FROM [VitalHub_G09M].[dbo].[Consultas]

  USE [VitalHub_G09M]

  insert into Consultas values
  (NEWID(),'89B28CC5-0DD5-451D-AA04-56D969493CA3','0F4BBFEE-F337-4E23-B4F9-89234F387F12','DD581EB1-2118-4A77-B292-44BB78531651','F8526D31-362B-48C0-9AC7-17E75DD7ACE1','9E99BA38-648D-43DC-BF76-50A82337D913', '2024-04-03T15:00:00','Teste','Testado')